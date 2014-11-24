var obj = new npcsearch();


/*
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
*/


QUnit.test( "npcsearch()", function( assert ) {
  assert.ok(obj.mydata = {}, "npcsearch() constructor" );
});

QUnit.test( "processData()", function( assert ) {
  assert.deepEqual(processData(queryData), goodProcessedData, "processData()" );
});
