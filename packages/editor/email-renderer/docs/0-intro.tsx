import { code, md } from '@uidu/docs';

export default md`
# Email renderer

This package provides renderer that is capable of rendering email-friendly HTML from ADF documents.

## Usage

Use as follows:

${code`
import { defaultSchema } from '@uidu/adf-schema/schema-default';
import { EmailSerializer } from '@uidu/email-renderer';

const document = ... // Your ADF JSON document

const serializer = EmailSerializer.fromSchema(defaultSchema);
const node = defaultSchema.nodeFromJSON(document);
const result = serializer.serializeFragment(node.content);
`}

`;
