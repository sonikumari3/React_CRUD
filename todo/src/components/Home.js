import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';

function Home() {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const blogs = localStorage.getItem('blogs')
        setBlogs(JSON.parse(blogs))
    }, [blogs])

    const handleDelete = (blogOutIndex) => {
        const _blogs = blogs.filter((blog, blogInIndex) => {
            if (blogInIndex !== blogOutIndex) {
                return blog
            }
        })
        console.log(_blogs)
        setBlogs(_blogs)
        localStorage.setItem('blogs', JSON.stringify(_blogs))
    }

    const handleEdit = (blogIndex) => {
        localStorage.setItem('editIndex', blogIndex)
        navigate('/edit')
    }



    return (
        <>
            <br />
            <Button
                onClick={() => {
                    navigate('/add')
                }}
                variant="contained" > ADD BLOG </Button>
            <br />

            {
                blogs && blogs.length > 0 ?
                    blogs.map((blog, blogIndex) => {
                        return (
                            <div style={{ borderBottom: "1px solid #eee", margin: '10px 0px' }}>
                                <span style={{
                                    display: 'inline-block',
                                    minWidth: '200px'
                                }}>
                                    {blog?.title} </span>
                                <span style={{
                                    display: 'inline-block',
                                    minWidth: '280px'
                                }}>
                                    {blog?.desc}
                                </span>
                                <EditIcon style={{ color: 'blue', minWidth: '50px' }} onClick={() => handleEdit(blogIndex)} ></EditIcon>
                                <DeleteIcon style={{ color: 'red' }} onClick={() => handleDelete(blogIndex)} ></DeleteIcon>
                            </div>
                        )
                    })
                    :
                    'No Data found'
            }
        </>
    )
}

export default Home
