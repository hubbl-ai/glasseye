GENERATED_FILE_NAMES = \
	index.ts \

GENERATED_FILES = $(patsubst %, ../%, $(GENERATED_FILE_NAMES))

SOURCE_FILES = \
	base.ts \
	linechart.ts \
	barchart.ts \
	piechart.ts \

all: $(GENERATED_FILES) rollup

clean:
	rm -f $(GENERATED_FILES)

rollup:
	cd .. && npx rollup -c

../index.ts: $(SOURCE_FILES)
	@ echo Building bundle

	@if [ -f $@ ]; then mv $@ $@~;  fi;
	@echo "// Warning! THIS FILE WAS GENERATED! DO NOT EDIT!\n// Generated `date`\n" > $@
	@for f in $^; do \
	    echo "\n/// $$f\n"; \
	    cat $$f; \
	done >> $@
