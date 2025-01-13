SETUP = ../../../setup.py

GENERATED_FILE_NAMES = \
	glasseyeCharts.js \
	glasseyeCharts.min.js

GENERATED_FILES = $(patsubst %, ../%, $(GENERATED_FILE_NAMES))

SOURCE_FILES = \
	GlasseyeChart.js \
	GlobalFunctionsAndVariable.js \
	GridChart.js \
	NonStandard.js \
	Tree.js \
	Venn.js \
	Dial.js \
	LogReg.js \
	RandomNumber.js \
	AnimatedDensity.js \
	PolygonMap.js \
	Skey.js \
	BarChart.js \
	Pie.js \
	Linechart.js \
	Force.js \
	Gant.js \

# Parsers.js \
# Heatmap.js
# AnimatedBarChart.js \
# AnimatedDonut.js \
# AnimatedVenn.js \
# DrillableVenn.js \
# TimeSeries.js \
# ScatterPlot.js \
# Thermometers.js \

all: $(GENERATED_FILES) copydemo

copydemo: ../glasseyeCharts.js ../../css/GlasseyeCharts.css
	cp ../glasseyeCharts.js ../../demo/js
	cp ../../css/GlasseyeCharts.css ../../demo/css

clean:
	rm -f $(GENERATED_FILES)

../glasseyeCharts.js: $(SOURCE_FILES)
	@ echo Building bundle

	@if [ -f $@ ]; then mv $@ $@~;  fi;
	@echo "// Warning! THIS FILE WAS GENERATED! DO NOT EDIT!\n// Generated `date`\n" > $@
	@for f in $^; do \
	    echo "\n/// $$f\n"; \
	    cat $$f; \
	done >> $@

../glasseyeCharts.min.js: ../glasseyeCharts.js
	@echo Minifying bundle
	uglifyjs $^ -o $@  -c -m

install: $(SETUP) $(GENERATED_FILES)
	@echo Running setup
	@python $(SETUP) sdist upload
	@echo Reinstalling package locally
	@pip uninstall glasseye
	@pip install glasseye
