import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
    render() {
        const { experience, education } = this.props;
        
        const experienceItems = experience.map((item, _id) => {
            return (
                <li key={item._id} className="list-item">
                    <h4 className="headerCreds-subtitle">{item.company}</h4>
                    <p  className="headerCreds-text">
                        <Moment format="DD/MM/YYYY">{item.from}</Moment> -
                        {
                            item.to === null ?
                                (' Данный момент')
                                :
                                (<Moment format="DD/MM/YYYY">{item.to}</Moment>)
                        }
                    </p>
                    <p  className="headerCreds-text">
                        <strong>Позиция:</strong> {item.title}
                    </p>
                    <p  className="headerCreds-text">
                        {item.location === "" ? null : (<span><strong>Местоположение: </strong> {item.location}</span>)}
                    </p>
                    <p  className="headerCreds-text">
                        {item.description === "" ? null : (<span><strong>Описание: </strong> {item.description}</span>)}
                    </p>
                </li>
            )
        });

        const educationItems = education.map((item, _id) => {
            return (
                <li key={item._id} className="list-item">
                    <h4 className="headerCreds-subtitle">{item.school}</h4>
                    <p className="headerCreds-text">
                        <Moment format="DD/MM/YYYY">{item.from}</Moment> -
                        {
                            item.to === null ?
                                (' Данный момент')
                                :
                                (<Moment format="DD/MM/YYYY">{item.to}</Moment>)
                        }
                    </p>
                    <p className="headerCreds-text">
                        <strong>Степень:</strong> {item.degree}
                    </p>
                    <p className="headerCreds-text">
                        <strong>Специальность:</strong> {item.fieldofstudy}
                    </p>
                    <p className="headerCreds-text">
                        {item.location === "" ? null : (<span><strong>Местоположение: </strong> {item.location}</span>)}
                    </p>
                    <p className="headerCreds-text">
                        {item.description === "" ? null : (<span><strong>Описание: </strong> {item.description}</span>)}
                    </p>
                </li>
            )
        })
        return (
            <div className="headerCreds-container">
                <div className="headerCreds-content">
                    <h3 className="headerCreds-text-center">Опыт</h3>
                    {
                        experienceItems && experienceItems.length > 0  ?
                            (<ul className="list-group">
                                {experienceItems}
                            </ul>)
                            : (
                                <p className="text-center">Нет информации об опыте</p>
                            )
                    }
                </div>

                <div className="headerCreds-content">
                    <h3 className="headerCreds-text-center">Образование</h3>
                    {
                        educationItems && educationItems.length > 0  ?
                            (
                                <ul className="list-group">
                                    {educationItems}
                                </ul>
                            )
                            : 
                            (
                                <p className="text-center">Нет информации об образовании</p>
                            )
                    }
                </div>
            </div>

        )
    }
}

export default ProfileCreds;