import axios from "axios";
import styled from "styled-components";
import swal from "sweetalert";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/user.context";

import { back2, clean } from "../../assets/img/export";

import CartHeader from "../content/CartHeader.content";
import CartContent from "../content/CartContent.content";
import CartFooter from "../content/CartFooter.content";
import { useNavigate } from "react-router-dom";

function CartScreen() {
    const { loggedUser } = useContext(UserContext);
    const [cart, setCart] = useState();
    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: "Bearer " + loggedUser.token,
        },
    };

    useEffect(() => {
        axios
            .get("https://sweetkalu-back.onrender.com/cart", config)
            .then((ans) => {
                setCart(ans.data);
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

    if (!cart) {
        return;
    }

    return (
        <Screen>
            <CartHeader />
            <CartContent products={cart.products} />
            <CartFooter subtotal={cart.subtotalPrice} />
        </Screen>
    );
}

const Screen = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #f9e9d2;
`;

export default CartScreen;
