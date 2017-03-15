mkdir dist &>/dev/null
rm dist/* &>/dev/null
zip dist/chrome-pagestyler.zip -r {_locales/*,icons/*,js/*,src/*,manifest.json,LICENSE}
