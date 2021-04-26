import { BsFillHouseDoorFill } from "react-icons/bs";

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import React from 'react';

const CustomBreadcrumb = () => {

    const getAllPaths = () => {
        const paths = location.pathname
            .split('/')
            .map((p, i, arr) => {
                if (i === 0) return {
                    key: i,
                    content: (
                        <Breadcrumb.Item
                            key={`home-${i}`}
                            href="/"
                        >
                            <BsFillHouseDoorFill />
                        </Breadcrumb.Item>
                    ),
                    active: (i === arr.length - 1),
                    link: (i < arr.length - 1)
                };

                if (i === arr.length - 1) return {
                    key: i,
                    content: (
                        <Breadcrumb.Item
                            key={`${p}-${i}`}
                            active
                        >
                            {p}
                        </Breadcrumb.Item>
                    ),
                    active: (i === arr.length - 1)
                };

                return {
                    key: i,
                    content: (
                        <Breadcrumb.Item
                            key={`${p}-${i}`}
                            href={`${arr.slice(0, i + 1).join('/')}`}
                        >
                            {p}
                        </Breadcrumb.Item>
                    ),
                    active: (i === arr.length - 1),
                    link: (i < arr.length - 1)
                }
            })
            .map(({ content }) => content);

        return paths;
    };

    return (
        <Breadcrumb>
            {
                getAllPaths()
            }
        </Breadcrumb>
    );
};

export default CustomBreadcrumb;
