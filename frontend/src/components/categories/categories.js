import React from "react";
import {Box} from '@material-ui/core';
import {sendDeleteCategory, sendGetAllCategories} from '../../redux/modules/categories'
import * as rr from "react-redux";
import * as r from "react";
import {CustomCard} from '../extra/card'
import {Link} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

function categories() {
    const categories = rr.useSelector(state => state.categories);
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();

    r.useEffect(() => {
        dispatch(sendGetAllCategories());
    }, [dispatch])

    return (
        <Box>
            <h1>Categories</h1>
            {categories.categories.length !== 0 &&
            <Box>
                {users.user && users.user.role === 'admin' &&
                <Tooltip title="create category" aria-label="add">
                    <Link to={'/createcategory'}>
                        <Fab color="primary" size="small">
                            <AddIcon />
                        </Fab>
                    </Link>
                </Tooltip>
                }
                {categories.categories.map(i => (
                    <div key={i.id}>
                        <CustomCard
                            title={i.title}
                            content={i.description}
                            to={`/categories/${i.id}`}
                        />
                    </div>
                ))}
            </Box>
            }
        </Box>
    );
}

export default categories;

