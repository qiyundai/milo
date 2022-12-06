import { openAsDialog } from '@dexter/offer-selector-tool';
import { createPlaceholderEngine } from '@dexter/tacocat-core';
import {
  createWcsClient,
  createWcsPlaceholderProvider,
  wcsPendingHtmlPlaceholderTemplate,
  wcsRejectedHtmlPlaceholderTemplate,
  wcsPriceHtmlPlaceholderTemplate,
  wcsPriceOpticalHtmlPlaceholderTemplate,
  wcsPriceStrikethroughHtmlPlaceholderTemplate,
} from '@dexter/tacocat-wcs-client';

let closeDialog;

let onCancelCustom = () => {
  log.debug('Clicked on cancel - custom behaviour');
  if (closeDialog) closeDialog();
};

const engine = (wcsApiKey, wcsBaseUrl) =>
  createPlaceholderEngine().register(
    createWcsPlaceholderProvider(
      createWcsClient({
        apiKey: wcsApiKey,
        env,
        environment,
        landscape,
        baseUrl: wcsBaseUrl,
      }),
      {
        checkoutWorkflow: 'UCv3',
      }
    ),
    wcsPendingHtmlPlaceholderTemplate,
    wcsRejectedHtmlPlaceholderTemplate,
    wcsPriceHtmlPlaceholderTemplate,
    wcsPriceOpticalHtmlPlaceholderTemplate,
    wcsPriceStrikethroughHtmlPlaceholderTemplate
  );

const placeholderTypes = [
  {
    type: 'price',
    name: 'Price',
    description: 'Formatted price, can be inlined with neighbour text',
    doc: '#',
  },
  {
    type: 'priceOptical',
    name: 'Optical price',
    description:
      'Formatted price calculating monthly payments for annual plans, can be inlined with neighbour text',
    doc: '#',
  },
  {
    type: 'priceStrikethrough',
    name: 'Strikethrough price',
    description:
      'Formatted price displayed as strikethrough, can be inlined with neighbour text',
    doc: '#',
  },
];

const country = 'US';
const language = 'en';
const env = ProviderEnvironment.STAGE;
// see https://developers.corp.adobe.com/aos/docs/guide/overview.md#DataPlanes
const environment = Environment.PRODUCTION;
let landscape = Landscape.DRAFT;
let wcsBaseUrl = 'https://wcs-stage.adobe.io';
let wcsApiKey = 'dexter-commerce-web-artifacts';
let aosApiKey = 'dexter-commerce-offers';

if (env === ProviderEnvironment.PRODUCTION) {
  wcsBaseUrl = 'https://wcs.adobe.io';
  landscape = Landscape.PUBLISHED;
  wcsApiKey = 'wcms-commerce-ims-ro-user-cc';
  aosApiKey = 'wcms-commerce-ims-user-prod';
}

const appContext = {
  aosParams: {
    marketSegment: 'COM',
    offerType: 'BASE',
  },
  apiKey: aosApiKey,
  accessToken:
    process.env.AOS_ACCESS_TOKEN || localStorage.getItem('AOS_ACCESS_TOKEN'),
  env,
  environment,
  landscape,
  onCancel: onCancelCustom,
  engine: engine(wcsApiKey, wcsBaseUrl),
  country,
  globals: [
    {
      checkoutWorkflow: 'UCv3',
      country,
      language,
    },
  ],
  defaultPlaceholderOptions: {
    displayFormatted: true,
    displayRecurrence: true,
    displayPerUnit: true,
    displayTax: false,
  },
  offerSelectorPlaceholderOptions: {
    // displayFormatted: false,
  },
  placeholderTypes,
  showPlaceholderOptions: true,
  // showPlaceholders: false,
  // disableOfferSelection: true,
  // searchOfferId: '0B74E5966B064D1A4FF61E60DCF545F3',
};

export const initOst = async (el) => {
  const root = document.getElementById('root');
  const onSelectHandler = (offerSelectorId, type, offer, options) => {
    log.debug(offerSelectorId, type, offer, options);
    closeDialog();
  };
  console.log(closeDialog);
  closeDialog = openAsDialog(root, onSelectHandler, appContext);
};
