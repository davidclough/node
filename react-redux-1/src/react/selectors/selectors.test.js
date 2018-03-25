import expect from 'expect';
import {authorsFormattedForDropdown} from "./selectors";

describe('Author Selectors', () => {
  describe('authorsFormattedForDropdown', () => {
    it('should return author data formatted for use within dropdown', () => {
      const authors = [
        {id: 'cory-house', firstName: 'Cory', lastName: 'House'},
        {id: 'frank-sinatra', firstName: 'Frank', lastName: 'Sinatra'}
      ];

      const expected = [
        {value: 'cory-house', text: 'Cory House'},
        {value: 'frank-sinatra', text: 'Frank Sinatra'}
      ];

      expect(authorsFormattedForDropdown(authors)).toEqual(expected);
    });
  });
});
