import { useEffect, useState } from "react";

export default function Pagination(props: paginationProps){

    const [linkModels, setLinkmodels] = useState<linkModel[]>([]);

    function selectPage(link: linkModel){
        if(link.page === props.currentPage){
            return;
        }

        if(!link.enabled){
            return;
        }

        props.onChange(link.page);
    }

    function getClass(link: linkModel){
        if(link.active){
            return "active pointer";
        }

        if(!link.enabled){
            return "disabled";
        }

        return "pointer";
    }
    useEffect(() =>{
        const previousPageEnabled = props.currentPage !== 1;
        const previousPage = props.currentPage - 1;
        const links: linkModel[] = [];

        links.push({
            text: 'Previous',
            enabled: previousPageEnabled,
            page: previousPage,
            active: false
        });

        for (let i = 1; i <= props.totalAmountOfpages; i++){
            if(i >= props.currentPage - props.radio && i <= props.currentPage + props.radio){
                links.push({
                    text: `${i}`,
                    active: props.currentPage === i,
                    enabled: true,
                    page: i
                })
            }
        }
        const nextPageEnabled = props.currentPage !== props.totalAmountOfpages &&
            props.totalAmountOfpages > 0;
        const nextPage = props.currentPage + 1;

        links.push({
            text: 'Next',
            page: nextPage,
            enabled: nextPageEnabled,
            active: false
        })

        setLinkmodels(links);
    }, [props.currentPage, props.totalAmountOfpages, props.radio])

    return <nav>
        <ul className="pagination justify-content-center">
            {linkModels.map(link => <li 
                onClick={() => selectPage(link)}
                className={`page-item cursor ${getClass(link)}`}
            >
                <span className="page-link">{link.text}</span>
            </li>)}

        </ul>
    </nav>
}

interface linkModel{
    page: number;
    enabled: boolean;
    text: string;
    active: boolean;
}

interface paginationProps{
    currentPage: number;
    totalAmountOfpages: number;
    radio: number;
    onChange(page: number): void;
}

Pagination.defaultProps = {
    radio: 3
}