GENERATED_FILE_NAMES = \
	index.ts \

GENERATED_FILES = $(patsubst %, ../%, $(GENERATED_FILE_NAMES))

SOURCE_FILES = \
	base.ts \
	linechart.ts \
	barchart.ts \
	piechart.ts \
	skey.ts \
	gantt.ts \

all: $(GENERATED_FILES) rollup copydemo

clean:
	rm -f $(GENERATED_FILES)

rollup:
	cd .. && npx rollup -c

copydemo:
	cd .. && cp ./dist/glasseyechart.js ../demo/js/glasseyechart.js

../index.ts: $(SOURCE_FILES)
	@ echo Building bundle

	nx build

	# @if [ -f $@ ]; then mv $@ $@~;  fi;
	# @echo "// Warning! THIS FILE WAS GENERATED! DO NOT EDIT!\n// Generated `date`\n" > $@

	# @for f in $^; do \
	#     echo "\n/// $$f\n"; \
	#     cat $$f; \
	# done >> $@

../index-try.ts: $(SOURCE_FILES)
	@ echo Building bundle

	@if [ -f $@ ]; then mv $@ $@~;  fi;
	@echo "// Warning! THIS FILE WAS GENERATED! DO NOT EDIT!\n// Generated `date`\n" > $@

	# Make a list of the unique imports in all files

	@for f in $^; do \
		grep '^import' $$f \
	done | sort | uniq >>  $@

	# Now concatenate everything but the imports

	@for f in $^; do \
	    echo "\n/// $$f\n"; \
	    grep -v '^import' $$f \
	done >> $@
