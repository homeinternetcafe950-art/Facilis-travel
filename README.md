# Facilis Travel website

Flat static site (HTML, one CSS file, one small JavaScript file). No build step.

## Deploying
Upload all files to the root of the web host or GitHub repo (for GitHub Pages: Settings > Pages > Deploy from branch > main / root).
The site assumes it is served from the root of https://facilistravel.co.za/. 404.html uses root-relative paths for this reason.

## Details the owner still needs to confirm
- Email address (currently Facilistravel@gmail.com). If it changes, update it in every HTML file (footer, contact, privacy, terms, refunds, FAQ, schema) and in the `data-email` attribute on the two forms.
- Street address / precise location. None is published. Do not add a street address, map or coordinates until confirmed and until it is decided whether the public may visit.
- Business hours. None are published.
- Have the Privacy Policy, Terms and Refund Policy reviewed by a South African lawyer, and confirm the retention period and deletion practice before stating one.

## Forms
The enquiry and contact forms build a WhatsApp message and open WhatsApp (number 27635048891). Nothing is sent to a server. The visitor must press Send in WhatsApp.

## Search Console (manual steps)
1. Add and verify the property for https://facilistravel.co.za/
2. Submit https://facilistravel.co.za/sitemap.xml
3. Inspect the home page URL and request indexing if desired.
