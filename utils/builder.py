import os

source = '../src/Btween.js'
output = '../build/btween.min.js'

os.system( 'java -jar compiler/compiler.jar --language_in=ECMASCRIPT5_STRICT --js ' + source + ' --js_output_file ' + output )

# header

with open(output,'r') as f: text = f.read()
with open(output,'w') as f: f.write('// btween.js - http://github.com/patr1k/btween.js\n' + text)