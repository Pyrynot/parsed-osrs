import { Injectable, Logger } from '@nestjs/common';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { WIKI_PAGES_FOLDER } from '../../constants/paths';
import {
  WikiPageWithContent,
  WikiRequestService,
} from '../wiki/wikiRequest.service';
import { PageListDumper } from './page-list.dumper';

interface WikiPageResponse {
  title: string;
  revid: number;
  displaytitle: string;
  text: {
    '*': string;
  };
  wikitext: {
    '*': string;
  };
  properties: { name: string; '*': string }[];
}

@Injectable()
export class PageContentDumper {
  private logger = new Logger(PageContentDumper.name);

  constructor(
    private PageListDumper: PageListDumper,
    private WikiRequestService: WikiRequestService
  ) {}

  /**
   * Will dump all wiki pages
   */
  async dumpAllWikiPages(): Promise<void> {
    this.logger.log('Dump All Wiki Pages');
    const allPages = this.PageListDumper.getWikiPageList();
    // Todo: Use recentchanges + find the latest date to only update the ones that were changed
    const now = Date.now() / 1000;
    for (let i = 0; i < allPages.length; i++) {
      if (i % 10 === 0) {
        this.logger.log(
          `Request ${i} / ${allPages.length} - ${Math.round(
            Math.round(Date.now() / 1000 - now)
          )} s elapsed`
        );
      }

      const currentPage = allPages[i];
      try {
        await this.dumpWikiPageById(currentPage.pageid);
      } catch (e) {
        this.logger.error(e);
      }
    }
    this.logger.log('Dump All Wiki Pages: Completed');
  }

  async dumpWikiPageById(pageId: number) {
    const redirects = this.WikiRequestService.getRedirectsToPage(pageId);
    let response;
    try {
      response = await this.WikiRequestService.query<{
        parse: WikiPageResponse;
      }>({
        action: 'parse',
        pageid: pageId.toString(),
        format: 'json',
        prop: 'properties|wikitext|displaytitle|subtitle|revid|text',
      }).catch((e) => this.logger.error(e));
    } catch (e) {
      this.logger.error(e);
    }
    if (!response) return;
    const result = response.parse as WikiPageResponse;

    const newPage: WikiPageWithContent = {
      pageid: pageId,
      pagename: result.title,
      title: result.displaytitle,
      displaytitle: result.displaytitle,
      revid: result.revid,
      redirects: await redirects,
      properties: result.properties.map((p) => ({
        name: p.name,
        value: p['*'],
      })),
      content: result.text['*'],
      rawContent: result.wikitext['*'],
    };

    writeFileSync(this.getPathFromPageId(pageId), JSON.stringify(newPage));
    this.logger.log('Dump All Wiki Pages - Completed');
  }

  public getPageFromId(pageId: number): WikiPageWithContent | null {
    const candidatePath = this.getPathFromPageId(pageId);
    if (!existsSync(candidatePath)) {
      return null;
    }

    const pageContent = readFileSync(candidatePath, 'utf8');
    let parsed = null;
    try {
      parsed = JSON.parse(pageContent);
    } catch (e) {
      this.logger.warn('Page has invalid content', pageId, e);
    }
    return parsed;
  }

  private getPathFromPageId(pageId: number): string {
    return `${WIKI_PAGES_FOLDER}/${pageId}.json`;
  }
}
