# Gulp lab
1. Syftet med automatiseringen är att spara tid och hålla ordning i projekt genom att automatiskt konkatenera och minifiera filer. Filerna skickas slutligen till en mapp som då är färdig för publicering. Tack vare denna process kan arbetsfiler med olika syften hållas isär under utveckling, något som gör utveckling med CSS och JavaScript mer överskådligt.

2. Paket som används (förutom gulp):
    - browser-sync
        - används till automatisk uppdatering av webbläsaren under utveckling med gulp. Detta paket valdes p.g.a. dess popularitet och kompatibilitet med gulp.
    - gulp-clean-css
        - används till minifiering av CSS-filer. Valdes p.g.a. popularitet.
    - gulp-concat
        - används till konkatenering (ihopslagning) av filer av samma typ, i detta projekt JavaScript- och CSS-filer. Valdes p.g.a. popularitet.
    - gulp-imagemin
        - används till minifiering av bildfiler. Valdes p.g.a. popularitet.
    - gulp-terser
        - används till minifiering av JavaScript. Valdes istället för både uglify och uglify-es, p.g.a ökande popularitet och mer nyliga uppdateringar.

3. Projektmappen består av 
    - katalogerna:
        - node_modules: paket till node
        - src: arbetskatalogen med html-filer, en katalog för CSS, en för JavaScript och en för bilder.
        - pub: katalogen för publicering. Hit skickas de automatiskt modifierade filerna under utvecklingen.
    - filerna (förutom README.md):
        - .gitignore som ignorerar katalogerna node_modules och pub.
        - package.json och package-lock.json som innehåller data om node-paket.
        - gulpfile.js som innehåller alla funktioner för automation, s.k. tasks, vars syften är:
            - Kopiering av HTML-filer till publiceringskatalogen
            - Kopiering, minifiering och konkatenering av CSS-filer (gulp-clean-css, gulp-concat)
            - Kopiering, minifiering och konkatenering av JavaScript-filer (gulp-terser, gulp-concat)
            - Kopiering och minifiering av bildfiler (gulp-imagemin)
            - kontroll av modifiering och därefter körning av funktionerna beskrivna ovan, varefter webbläsaren uppdateras (watch, browser-sync)
            - start av server för automatisk uppdatering av innehållet i webbläsaren (browser-sync)
    - Miljön startas genom att köra kommandot *gulp* i ett terminalfönser från projektkatalogen.
