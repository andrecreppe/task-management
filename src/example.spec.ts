import { from } from "rxjs";

//Feature
class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const index = this.friends.indexOf(name);

    if(index === -1) {
      throw new Error('Friend not on the list');
    }

    this.friends.splice(index, 1);
  }
}

//Test
describe('FriendsList', () => {
  let friendsList;

  //Before each it
  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('adds a friend to the list', () => {
    friendsList.addFriend('Andre');

    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendsList.announceFriendship = jest.fn(); //"add listener"

    expect(friendsList.announceFriendship).not.toHaveBeenCalled();

    friendsList.addFriend('Andre');

    //expect(friendsLists.announceFriendship).toHaveBeenCalled();
    //expect(friendsLists.announceFriendship).toHaveBeenCalledTimes();
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Andre');
  });

  describe('RemoveFriend', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('Andre');

      expect(friendsList.friends[0]).toEqual('Andre');

      friendsList.removeFriend('Andre');

      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throw a error if friend does not exist', () => {
      expect(() => friendsList.removeFriend('Andre')).toThrow();
      //expect(() => friendsList.removeFriend('Andre')).toThrow(new Error('Friend not on the list'));
    });
  });
});