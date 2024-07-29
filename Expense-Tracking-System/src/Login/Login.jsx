import './Login.css'

function Login(){
    return(
        <div className="Login">
            <section>
                <div className='color'></div>
                <div className='color'></div>
                <div className='color'></div>
                <div className='box'>
                    <div className='square'  style={{'--i': 0}}></div>
                    <div className='square'  style={{'--i': 1}}></div>
                    <div className='square'  style={{'--i': 2}}></div>
                    <div className='square'  style={{'--i': 3}}></div>
                    <div className='square'  style={{'--i': 4}}></div>
                    <div className='container'>
                        <h2>Login Form</h2>
                        <form>
                            <div className='inputBox'>
                                <input type='text' placeholder='Username'></input>
                            </div>
                            <div className='inputBox'>
                                <input type='password' placeholder='Password'></input>
                            </div>
                            <div className='inputBox'>
                                <input type='submit' value="Login"></input>
                            </div>
                            <p>Forgot Password? <a href='#'>Click here</a></p>
                            <p>Don't have an account? <a href='#'>Sign up</a></p>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Login