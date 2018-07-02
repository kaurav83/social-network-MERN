import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: 'db4e507d65cb3ada3109',
      clientSecret: 'e23955f98227a36b0d040f032d9975722f77a1c0',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
            this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="headerGitgub-repos">
        <div className="headerGitgub-repos__item">
          <div className="headerGitgub-repos__stuf">
            <h4 className="headerGitgub-repos__name">
              <a href={repo.html_url} className="headerGitgub-repos__link" target="_blank">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="headerGitgub-repos__credentials">
            <span className="headerGitgub-repos__cred yellow">
              Stars: {repo.stargazers_count}
            </span>
            <span className="headerGitgub-repos__cred green">
              Watchers: {repo.watchers_count}
            </span>
            <span className="headerGitgub-repos__cred purple">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myRef" className="headerGitgub-container">
        <h3 className="headerGitgub-text-center">Самые последние Github репозитории</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;