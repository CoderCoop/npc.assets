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
  assert.deepEqual(processData(queryData), queryDataProcessedGood, "3 valid search results, keyword=mint" );
  assert.deepEqual(processData(queryDataSingleResult), queryDataSingleResultProcessedGood, "1 valid search result, keyword=bittersweet" );
  assert.equal(processData(zeroResultsQueryData),undefined,"zero search results");
  assert.equal(processData(invalidQueryData),undefined,"invalid search result");
});
