import React from 'react';

const NotFound = () => {
    return (
        <div className="not-found">
            <div 
                className="not-found-container"
                style={{
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh'
                }}
            >
                <div className="not-found-content"  
                    style={{
                        textAlign: 'center', 
                        width: "20rem", 
                        alignSelf: 'center'
                    }}>
                    <h1 className="title404" >ERROR 404</h1>
                    <p className="text404">Простите, такой страницы не существует</p>
                </div>
                
            </div>
        </div>
    );
};

export default NotFound;