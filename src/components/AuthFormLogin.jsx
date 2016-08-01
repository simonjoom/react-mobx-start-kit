//import { connect } from '~/src/utils/state';
import cx from 'classnames';

import {observer} from "mobx-react";
// styles
const errorMessage = cx('red', 'm2');

// components
import TextField from 'material-ui/TextField';

//const AuthModal = ({ form }) => {

@observer(['context'])
class AuthModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let myrefs = 'btn-disabled';
        let form = this.props.form;
        return (
            <form>
                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    name={form.fields.email.name}
                    value={form.fields.email.value}
                    onChange={form.syncValue}
                    errorText={form.fields.email.errorMessage}
                />
                <TextField
                    hintText="Password"
                    name={form.fields.password.name}
                    floatingLabelText="Password"
                    value={form.fields.password.value}
                    onChange={form.syncValue}
                    errorText={form.fields.password.errorMessage}
                />
                <div className="mt3">
                    <button
                        type="submit"
                        disabled={!form.isValid}
                        className={cx('btn','btn-primary',{
        [`${myrefs}`]: !form.isValid })}
                        onClick={form.handleOnSubmit}>Login
                    </button>
                </div>
                <div
                    className={cx(errorMessage, {
        'hide': !form.isValid && form.genericErrorMessage,
      })}
                >
                    {form.genericErrorMessage}
                </div>
            </form>
        );
    }
}

AuthModal.propTypes = {
    form: React.PropTypes.object,
};

export default AuthModal;
