import { randomHex, makeUUID } from './utils';

const GRAPHQL_URL = 'https://web.prod.cloud.netflix.com/graphql';
const QUERY_ID = '573bcc5d-b976-4302-8b57-c3f99479532d';
const QUERY_VER = 102;

async function hideTitleViewing(videoId: string, profileGuid: string, originUrl: string): Promise<any> {
  const body = JSON.stringify({
    operationName: 'HideTitleViewing',
    variables: { input: { videoId: String(videoId), hideAllEpisodes: true, profileGuid } },
    extensions: { persistedQuery: { id: QUERY_ID, version: QUERY_VER } },
  });

  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'accept': '*/*',
      'accept-language': 'de-de,de;q=0.9,en-US;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'pragma': 'no-cache',
      'x-netflix.context.app-version': 'vcd167f4a',
      'x-netflix.context.hawkins-version': '5.18.0',
      'x-netflix.context.locales': 'de-de',
      'x-netflix.context.operation-name': 'HideTitleViewing',
      'x-netflix.context.ui-flavor': 'akira',
      'x-netflix.request.attempt': '1',
      'x-netflix.request.client.context': '{"appstate":"foreground"}',
      'x-netflix.request.id': randomHex(16),
      'x-netflix.request.originating.url': originUrl || 'https://www.netflix.com/browse',
      'x-netflix.request.toplevel.uuid': makeUUID(),
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  if (data?.errors?.length) {
    throw new Error(data.errors.map((e: any) => e.message).join(', '));
  }

  return data;
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse: (response: any) => void) => {
  if (msg.type !== 'HIDE_TITLE') return false;

  const { videoId, profileGuid, originUrl } = msg;

  if (!videoId || !profileGuid) {
    sendResponse({ ok: false, error: 'Missing required parameters' });
    return true;
  }

  hideTitleViewing(videoId, profileGuid, originUrl || '')
      .then(data => sendResponse({ ok: true, data }))
      .catch(err => sendResponse({ ok: false, error: (err as Error).message }));

  return true;
});