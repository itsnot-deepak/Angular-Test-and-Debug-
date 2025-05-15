import { UserListService } from './user-list.service';
//all the tests are written in jasmine are written in the descirbe block which takes two inputs 
// the first is a string that describes the function and the second is a callback function 
describe('User List Service', () => { // describe is the global function and the it takes in 
    // this is let and not const because we are going to make an instance of the service before each of the test case 
    let service: UserListService;

    //This is the jasmine before each function which runs before each test case 
    beforeEach(() => {
        service = new UserListService(); // we are creating an new instance 
    });
    // the it function is used to declare actual test logic , this also takes a string describing what the test should return 
    // angular is asynchronus by design but jasmine is not so we need to till jasmine to wait for the functions that are asynchronous 
    it('should return a User List with 16 users', (done: DoneFn) => { //here the it waits for the aynchronous service to end and jasmine gets to know that this function is async by the use of done argument  , by default the wait time is 5 seconds but we can change it by putting things at the end 
        service.getAll().then((response) => { // the logic for the test is written in the callback of then
            expect(response.length).toBe(16); // te expect takes in the thing we wanna check and tobe takes in the value we check it with 
            done(); // done is used to tell the karma that the test is done 
        });
    }/*,10000*/); // like this we can give a custom time in milliseconds here 
});