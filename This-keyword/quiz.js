// https://javascript.info/object-methods
function makeUser() {
    return {
      name: "John",
      ref: this
    };
  }
  
  let user = makeUser();
  
  alert( user.ref.name ); // What's the result?

//   Ans:// Error: Cannot read property 'name' of undefined


// Such approach is widely used across JavaScript libraries
// There’s a ladder object that allows to go up and down:
let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep() {
      alert( this.step );
      return this;
    }
  };
  
  ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0