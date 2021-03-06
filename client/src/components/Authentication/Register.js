import React from 'react';
import styles from '../Authentication/Register.module.css';
import { Redirect } from 'react-router-dom';
import Error from '../Error/Error';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            error: null,
        }

    }

    handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const passwordConfirm = e.target.passwordConfirm.value;
        const imageUrl =  e.target.imageUrl.value || 'https://i.stack.imgur.com/34AD2.jpg';


        const url = 'http://localhost:4000/users/register';

        const promise = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                passwordConfirm,
                imageUrl,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const response = await promise.json();

        //console.log(response);

        if (response.message) {

            const errorMessage = response.message;

            this.setState({ error: errorMessage });


        } else {
            localStorage.setItem('jwt', response.token);
            localStorage.setItem('username', response.user.username);
            localStorage.setItem('userId', response.user._id);

            this.setState({ redirect: true });
            this.props.checkLogin();
        }


    }

    render() {


        if (this.state.redirect) {
            return <Redirect to="/" />
        }

        if (this.state.error) {
            // return (
            //     <div className={styles.register}>
            //         <div className={styles.registerInner}>
            //             <h1>Register</h1>
            //             <Error error={this.state.error} />

            //             <form className={styles.registerForm} onSubmit={this.handleRegister}>
            //                 <label htmlFor='username'>Username</label>
            //                 <input type='text' name='username' id='username' className={styles.input} autoComplete="on" placeholder='Username' />

            //                 <label htmlFor='password'>Password</label>
            //                 <input type='password' name='password' id='password' className={styles.input} autoComplete="on"  placeholder='Password' />

            //                 <label htmlFor='passwordConfirm'>Confirm Password</label>
            //                 <input type='password' name='passwordConfirm' id='passwordConfirm' className={styles.input} autoComplete="on" placeholder='Confirm Password' />
                            
            //                 <label htmlFor='imageUrl'>Profile Picture</label>
            //                 <input type='text' name='imageUrl' id='imageUrl' className={styles.input} autoComplete="on" placeholder='Profile Picture' />
                            
            //                 <input type='submit' value='Register' className={styles.registerSubmit} />
            //             </form>
            //         </div>
            //     </div>
            // )


        }

        return (
            <div className={styles.register}>
                <div className={styles.registerInner}>
                    <h1>Register</h1>
                    {this.state.error ? <Error error={this.state.error} /> : null} 
                    <form className={styles.registerForm} onSubmit={this.handleRegister}>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' id='username' className={styles.input} autoComplete="on" placeholder='Username' />

                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' className={styles.input} autoComplete="on" placeholder='Password' />

                        <label htmlFor='passwordConfirm'>Confirm Password</label>
                        <input type='password' name='passwordConfirm' id='passwordConfirm' className={styles.input} autoComplete="on" placeholder='Confirm Password' />

                        <label htmlFor='imageUrl'>Image URL</label>
                        <input type='text' name='imageUrl' id='imageUrl' className={styles.input} autoComplete="on" placeholder='Profile Picture' />

                        <input type='submit' value='Register' className={styles.registerSubmit} />
                    </form>
                </div>
            </div>
        )
    }

}

export default Register;