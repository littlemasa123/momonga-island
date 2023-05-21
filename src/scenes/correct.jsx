import React from 'react';
import styles from './correct.module.css'
import { useState, useEffect } from 'react';
import Image from "next/image"
import pass from "../pass.json"
import db from "../firebase/firebase";
//import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getDocs, onSnapshot } from "firebase/firestore"

//console.log(pass.image_data)

const image_data = [];
for (let i = 0; i < pass.image_data.length; i++) {
    image_data[i] = pass.image_data[i];
}
console.log(image_data)



export function SP_correct(props) {
    console.log("props  " + props.answer)

    const [users, setUsers] = useState([]);
    useEffect(() => {
        //データベースからデータ取得
        const userData = collection(db, 'users');
        //console.log(userData);

        getDocs(userData).then((snapShot) => {
            //console.log(snapShot.docs.map(doc => ({...doc.data() })));
            setUsers(snapShot.docs.map(doc => ({ ...doc.data() })))
        });

        //リアルタイムで取得
        onSnapshot(userData, (user) => {
            setUsers(user.docs.map((doc) => ({ ...doc.data() })))
        })
    }, []);

    return (

        <div className={styles.container}>
            {users.map((user) => (
                <div key={users}><font size="30">第{user.quiznum + 1}問</font></div>
            ))}
            {users.map((user) => (
        <div key={users} className={styles.image_flex}>
          <Image src={image_data[user.quiznum].pass} alt="Vercel Logo" width={400} height={400} />
        </div>
      ))}
            <div className={styles.chatInputButton}>
                <p>
                    あなたのスコアは{props.answer}
                </p>
                <button className="intro__button" onClick={props.onClickStart}>
                    次の問題
                </button>

            </div>

        </div>


    );
};
