import axios from "axios";
import styled from "styled-components";
import swal from "sweetalert";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/user.context";

import ProductList from "../functions/ProductList";
import { useNavigate } from "react-router-dom";

function MainContent({ isOpenCart }) {
    const { loggedUser } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: "Bearer " + loggedUser.token,
        },
    };

    useEffect(() => {
        axios
            .get("https://sweetkalu-back.onrender.com/products", config)
            .then((ans) => {
                setProducts(ans.data);
            })
            .catch((err) => {
                swal({
                    title: "Vish!",
                    text: err.response.data.message,
                    icon: "error",
                    button: true,
                });
                navigate("/home");
            });
    }, []);

    return (
        <Screen>
            <Banner src="https://static01.nyt.com/images/2020/07/10/well/10well-newsletter/10well-newsletter-superJumbo.jpg" />
            <Content styleIsOpenCart={isOpenCart}>
                <ProductList products={products} />
            </Content>
        </Screen>
    );
}

const Screen = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Banner = styled.img`
    width: 100%;
    height: 300px;

    object-fit: cover;

    position: fixed;
    top: 0;
    left: 0;

    z-index: 0;

    background-color: #523015;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 200px;
    margin-bottom: ${(props) => (props.styleIsOpenCart ? "110px" : "50px")};
    padding: 20px;
    z-index: 1;

    border-radius: 30px 30px 0 0;

    background-color: #f9e9d2;
`;

export default MainContent;
