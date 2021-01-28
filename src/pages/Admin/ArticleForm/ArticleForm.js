import React, { useEffect , useState} from 'react';
import styles from './ArticleForm.module.css';

const ArticleForm = ({setShow, currentArticle, updateArticle, onFileChange, fileUrl}) => {
    const [data, setData] = useState(currentArticle);

    useEffect(()=>{
        setData(currentArticle);
        // console.log("useEffect passes current item", currentArticle);
    },[currentArticle]);

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]:value})
    };

    const submitArticle = (e) => {
        e.preventDefault();
        console.log("submit passed the id and item", data);
        updateArticle({currentArticle}, {...data, img: fileUrl || data.img});
    }; 
    const position = {position: 'relative', bottom: `0px`};
    return (
        <div className={styles.wrapper} style={position}>
            <p className={styles.header}>Articles</p>
            <form className={styles.container}>
                    <div className={styles.fields} >
                    <div className={styles.icon_text}>
                        Cover Image
                        <span>
                            (Image has to be below 200 KB and PNG/JPG format)
                        </span>
                        </div>
                        <div className={styles.upload_btn_wrapper}>
                        <input 
                            type="file" 
                            name="img" 
                            onChange={onFileChange} 
                        />
                        <button 
                            className={styles.btn}
                        >
                            Upload image
                        </button>
                        </div>
                    <label>
                        Title
                        <input type="text" name="title" value={data.title} onChange={inputHandler}/>
                    </label>
                    <label>
                        Text
                        <textarea 
                            name="description"
                            className={styles.textarea_input} 
                            value={data.description}
                            rows="4" 
                            cols="65"
                            onChange={inputHandler}
                        />
                    </label>
                    <label>
                        Link of the article
                        <input type="text" name="url" value={data.url} onChange={inputHandler}/>
                    </label>
                    </div> 
                </form>
                <div className={styles.buttons}>
                        <button type="submit" onClick={submitArticle}>Apply</button>
                        <button onClick={()=>setShow(false)}>Cancel</button>
                </div>
        </div>
    );
}

export default ArticleForm;
