import styles from '@/styles/signup.module.css'
import Image from 'next/image';
const signUp = () => {
    return ( 
        <main className={styles.mainSection}>
            <div className={styles.imageContainer}>
                {/* <Image src="/images/log2-removebg.png" width={1000} height={1000}>
                </Image> */}
               <img src="/images/log2-removebg.png" className={styles.image} />
           </div>
            <form action="/users/signup" className={styles.mainform}>
                    <div class={styles.inputs}>
                        <input type="text" placeholder="userName" name='userName'/>
                        <input type="email" placeholder="email" name='email'/>
                        <input type="password" placeholder="password" name='password' />
                        <input type="password" placeholder="password" name='password2'/>
                    </div>
                    <div className={styles.actions}>
                        <button type="submit">Sing up</button>
                    </div>
                </form>
        </main>
     );
}
const ob = {
    "dependencies": {
        "@emotion/react": "^11.10.5",
        "@emotion/styled": "^11.10.5",
        "@mui/material": "^5.11.6",
        "@next/font": "13.1.5",
        "express": "^4.18.2",
        "next": "13.1.5",
        "react": "18.2.0",
        "react-dom": "18.2.0"
      }
}
export default signUp;