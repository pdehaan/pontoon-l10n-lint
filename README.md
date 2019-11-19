# pontoon-l10n-lint

Compare the Pontoon l10n status to production locales.

## USAGE

```sh
npx pdehaan/pontoon-l10n-lint --pontoon-project=firefox-monitor-website --production-locales="cak,cs,cy,da,de,el,en,en-CA,en-GB,es-AR,es-CL,es-ES,es-MX,fi,fr,fy-NL,hu,kab,ia,id,it,ja,nl,nn-NO,pt-BR,pt-PT,ro,ru,sk,sl,sq,sv-SE,tr,uk,vi,zh-CN,zh-TW" --extra-locales="en"
```

**NOTE:** Currently there is no way to get the list of currently enabled production locales (at least for Firefox Monitor) unless you have access to the private OPs GitHub repo.

### OUTPUT

```js
{
  added: [ 'el', 'ja', 'nn-NO' ],
  removed: [],
  common: 'cak,cs,cy,da,de,en,en-CA,en-GB,es-AR,es-CL,es-ES,es-MX,fi,fr,fy-NL,hu,ia,id,it,kab,nl,pt-BR,pt-PT,ro,ru,sk,sl,sq,sv-SE,tr,uk,vi,zh-CN,zh-TW'
}
```

## CONFIGS

| ENV | CLI | DESCRIPTION
|:----|:----|:-----------
| &nbsp; | <kbd>--init</kbd> | Pipe sample config file to STDOUT.
| `PONTOON_CONFIG` | <kbd>--pontoon-config</kbd> | Path to config file. NOTE: Sample config can be generated using the `--init` arg.
| `PONTOON_PROJECT` | <kbd>--pontoon-project</kbd> | Name of the project on Pontoon.
| `PONTOON_MIN_PCT` | <kbd>--pontoon-min-pct</kbd> | Minimum Pontoon translation percentage to be considered for enabling on production.
| `PRODUCTION_LOCALES` | <kbd>--production-locales</kbd> | An array of locales currently supported on production.
| `EXTRA_LOCALES` | <kbd>--extra-locales</kbd> | An array of locales supported on production, but not in Pontoon.

## Creating a config file

If you want to create a config file to store your variables (versus defining an unweildy list of CLI arguments or ENV vars), you can use the `--init` flag (for example: <kbd>npx pdehaan/pontoon-l10n-lint --init</kbd>) which will write out a config object to STDOUT (which can easily be piped to an external file by appending `> .l10n-lint.json` to the previous `--init` command):

```json
{
  "pontoon": {
    "project": "firefox-monitor-website",
    "minPct": 80
  },
  "productionLocales": [],
  "extraLocales": []
}
```

Now you can update the file and specify the array of currently enabled production locales and any extra, fun locales you want to inject that may not be in Pontoon (for example: "en").

Consider the following ".l10n-lint.json" config file:

```js
{
  "pontoon": {
    "project": "firefox-monitor-website",
    "minPct": 80
  },
  "productionLocales": [
    "cak", "cs", "cy", "da", "de",
    "el", "en", "en-CA", "en-GB", "es-AR",
    "es-CL", "es-ES", "es-MX", "fi", "fr",
    "fy-NL", "hu", "kab", "ia", "id",
    "it", "ja", "nl", "nn-NO", "pt-BR",
    "pt-PT", "ro", "ru", "sk", "sl",
    "sq", "sv-SE", "tr", "uk", "vi",
    "zh-CN", "zh-TW"
  ],
  "extraLocales": [
    "en"
  ]
}
```

Running the following command will load values from the local config file and compare the locale list to the current values from Pontoon:

```sh
npx pdehaan/pontoon-l10n-lint --pontoon-config=./.l10n-lint.json

{
  added: [ 'el', 'ja', 'nn-NO' ],
  removed: [],
  common: 'cak,cs,cy,da,de,en,en-CA,en-GB,es-AR,es-CL,es-ES,es-MX,fi,fr,fy-NL,hu,ia,id,it,kab,nl,pt-BR,pt-PT,ro,ru,sk,sl,sq,sv-SE,tr,uk,vi,zh-CN,zh-TW'
}
```
