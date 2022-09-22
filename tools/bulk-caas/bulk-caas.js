import { mdast2docx, sanitizeHtml } from '../loc/helix/mdast2docx.bundle.js';
import { connect, saveFile } from '../loc/sharepoint.js';

const tagMap = {
    'adobe-com-enterprise/industry': 'caas:industry',
    'adobe-com-enterprise/industry/education': 'caas:industry/education',
    'adobe-com-enterprise/industry/financial-services': 'caas:industry/financial-services',
    'adobe-com-enterprise/industry/government': 'caas:industry/government',
    'adobe-com-enterprise/industry/healthcare': 'caas:industry/healthcare',
    'adobe-com-enterprise/industry/high-tech': 'caas:industry/high-tech',
    'adobe-com-enterprise/industry/manufacturing': 'caas:industry/manufacturing',
    'adobe-com-enterprise/industry/media-and-entertainment': 'caas:industry/media-and-entertainment',
    'adobe-com-enterprise/industry/non-profit': 'caas:industry/non-profit',
    'adobe-com-enterprise/industry/retail': 'caas:industry/retail',
    'adobe-com-enterprise/industry/telecom': 'caas:industry/telecommunications',
    'adobe-com-enterprise/industry/travel-and-hospitality': 'caas:industry/travel-and-hospitality',
    'adobe-com-enterprise/product': 'caas:products',
    'adobe-com-enterprise/product/acrobat-dc': 'caas:products/acrobat',
    'adobe-com-enterprise/product/advertising-cloud': 'caas:products/adobe-advertising-cloud',
    'adobe-com-enterprise/product/analytics': 'caas:products/adobe-analytics',
    'adobe-com-enterprise/product/audience-manager': 'caas:products/adobe-audience-manager',
    'adobe-com-enterprise/product/campaign': 'caas:products/adobe-campaign',
    'adobe-com-enterprise/product/captivate': 'caas:products/captivate',
    'adobe-com-enterprise/product/commerce-cloud': 'caas:products/adobe-commerce',
    'adobe-com-enterprise/product/commerce-cloud': 'caas:products/adobe-commerce-cloud',
    'adobe-com-enterprise/product/connect': 'caas:products/connect',
    'adobe-com-enterprise/product/creative-cloud': 'caas:products/adobe-creative-cloud',
    'adobe-com-enterprise/product/document_cloud': 'caas:products/adobe-document-cloud',
    'adobe-com-enterprise/product/experience-cloud': 'caas:products/adobe-experience-cloud',
    'adobe-com-enterprise/product/experience-manager': 'caas:products/adobe-experience-manager',
    'adobe-com-enterprise/product/experience-manager-assets': 'caas:products/adobe-experience-manager-assets',
    'adobe-com-enterprise/product/experience-manager-forms': 'caas:products/adobe-experience-manager-forms',
    'adobe-com-enterprise/product/experience-manager-sites': 'caas:products/adobe-experience-manager-sites',
    'adobe-com-enterprise/product/experience-platform': 'caas:products/adobe-experience-platform',
    'adobe-com-enterprise/product/journey-optimizer': 'caas:products/adobe-journey-optimizer',
    'adobe-com-enterprise/product/marketo-measure': 'caas:products/marketo-engage-bizible',
    'adobe-com-enterprise/product/primetime': 'caas:products/adobe-primetime',
    'adobe-com-enterprise/product/real-time-customer-data-platform': 'caas:products/adobe-real-time-cdp',
    'adobe-com-enterprise/product/sensei': 'caas:products/adobe-sensei',
    'adobe-com-enterprise/product/sign': 'caas:products/adobe-sign',
    'adobe-com-enterprise/product/target': 'caas:products/adobe-target',
    'adobe-com-enterprise/product/workfront': 'caas:products/adobe-workfront',
    'adobe-com-enterprise/product/workfront': 'caas:products/workfront',
    'adobe-com-enterprise/product/learning-manager': 'caas:products/learning-manager',
    'adobe-com-enterprise/product/customer-journey-analytics': 'caas:products/customer-journey-analytics',
    'adobe-com-enterprise/product/adobe-experience-manager-guides': 'caas:products/adobe-experience-manager-guides',
    'adobe-com-enterprise/topic': 'caas:topic',
    'adobe-com-enterprise/topic/advertising': 'caas:topic/advertising',
    'adobe-com-enterprise/topic/analytics': 'caas:topic/analytics',
    'adobe-com-enterprise/topic/commerce': 'caas:topic/commerce',
    'adobe-com-enterprise/topic/content-management': 'caas:topic/content-management',
    'adobe-com-enterprise/topic/customer-intelligence': 'caas:topic/customer-intelligence',
    'adobe-com-enterprise/topic/data-management': 'caas:topic/data-management',
    'adobe-com-enterprise/topic/digital-foundation': 'caas:topic/digital-foundation',
    'adobe-com-enterprise/topic/digital-trends': 'caas:topic/digital-trends',
    'adobe-com-enterprise/topic/documents-and-e-signatures': 'caas:topic/electronic-signature',
    'adobe-com-enterprise/topic/email-marketing': 'caas:topic/email-marketing',
    'adobe-com-enterprise/topic/marketing-automation': 'caas:topic/marketing-automation',
    'adobe-com-enterprise/topic/personalization': 'caas:topic/personalization',
  };

async function getNewFileHandle() {
    const options = {
      types: [
        {
          description: 'Word Files',
        },
      ],
    };
    const handle = await window.showSaveFilePicker(options);
    return handle;
  }

  async function writeFile(contents) {
    const fileHandle = await getNewFileHandle();
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
  }

  async function init() {
    await connect();
    const res = await fetch('https://business.adobe.com/customer-success-stories/helly-hansen-case-study.md',
    {method: 'GET', mode: 'no-cors'});
    const md = await res.text()
    const docx = await mdast2docx(md);
    saveFile(docx, '/drafts/cpeyer/hellyhanson.docx');
  }

  export default init;
