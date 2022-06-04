all: 
    just watch

release: check-types clean
    ./node_modules/esbuild/bin/esbuild src/main.ts --minify --bundle --outfile=build/main.js 
    cp src/main.html build

@build: check-types
    ./node_modules/esbuild/bin/esbuild src/main.ts --bundle --sourcemap --outfile=build/main.js 
    cp src/main.html build
    echo $(date +%H:%M:%S) "build ready"

@check-types:
    tsc --noEmit

serve: 
    python -m http.server --directory build/ &> /dev/null


watch: 
    just serve &
    watchexec --on-busy-update restart -i "build/*" -e ts,html,css,json just build

clean:
    rm -rf build/

# this does not deploy the backend currently
