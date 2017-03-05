import React from 'react';
import { FormControl } from 'react-bootstrap';

class NewIssueForm extends React.Component {
  render = () => (
    <div>
      <FormControl placeholder={'Title'} />
    </div>
  )
}

export default NewIssueForm;
