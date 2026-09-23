import Gun from 'gun';

const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);
const testNode = gun.get('antigravity_test_123');

testNode.put({ status: 'working' }, (ack) => {
  if (ack.err) {
    console.error("Error:", ack.err);
    process.exit(1);
  } else {
    console.log("Success!");
    process.exit(0);
  }
});
