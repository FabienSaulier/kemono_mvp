import { BrowserPolicy } from 'meteor/browser-policy-common';
// e.g., BrowserPolicy.content.allowOriginForAll( 's3.amazonaws.com' );
BrowserPolicy.content.allowFontOrigin("data:");

BrowserPolicy.content.allowFontDataUrl();
BrowserPolicy.content.allowImageOrigin("https://s3.eu-central-1.amazonaws.com");

BrowserPolicy.content.allowOriginForAll("www.google-analytics.com");

BrowserPolicy.content.allowStyleOrigin("fonts.googleapis.com");
BrowserPolicy.content.allowStyleOrigin("maxcdn.bootstrapcdn.com");
BrowserPolicy.content.allowFontOrigin("maxcdn.bootstrapcdn.com");

BrowserPolicy.content.allowFontOrigin("fonts.gstatic.com");

BrowserPolicy.content.allowStyleOrigin("cdnjs.cloudflare.com");
BrowserPolicy.content.allowFontOrigin("cdnjs.cloudflare.com");
