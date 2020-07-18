import React from "react";
import { Link } from "react-router-dom";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        const url = "/users/index";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ users: response }))
            .catch(() => this.props.history.push("/"));
    }

    render() {
        const { users } = this.state;
        const allUsers = users.map((user, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{user.email}</h5>
              </div>
            </div>
          </div>
        ));

        const noUser = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
              <h4>
                No users yet.
              </h4>
            </div>
          );
    
        return (
          <>
            <section className="jumbotron jumbotron-fluid text-center">
              <div className="container py-5">
                <h1 className="display-4">Users in DB</h1>
              </div>
            </section>
            <div className="py-5">
              <main className="container">
                <div className="row">
                  {users.length > 0 ? allUsers : noUser}
                </div>
                <Link to="/" className="btn btn-link">
                  Home
                </Link>
              </main>
            </div>
          </>
        );
      }

}
export default Users;