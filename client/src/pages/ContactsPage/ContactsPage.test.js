import ContactsPage from './ContactsPage'
import {render} from "@testing-library/react";

describe('ContactsPage',()=>{
  test('Contacts page renders',()=>{
    const {asFragment}= render(<ContactsPage/>)
    expect(asFragment()).toMatchSnapshot()
  });
})
