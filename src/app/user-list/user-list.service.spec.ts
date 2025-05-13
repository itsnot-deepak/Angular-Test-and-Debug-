import { UserListService } from './user-list.service';

describe('User List Service', () => { // describe is the global function and the it takes in 
    let service: UserListService;

    beforeEach(() => {
        service = new UserListService();
    });

    it('should return a User List with 16 users', (done: DoneFn) => {
        service.getAll().then((response) => {
            expect(response.length).toBe(16);
            done();
        });
    });
});