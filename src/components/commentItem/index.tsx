import React from 'react'
import { CommentListItem } from 'types/interface'
import './style.css';
import defaultPofileImage from 'assets/image/default-profile-image.png'

interface Props {
    commentListItem: CommentListItem;
}

//          component: Comment List Item            //
export default function CommentItem({ commentListItem }: Props) {
    //            state: properties          //
    const { nickname, profileImage, writeDatetime, content } = commentListItem     

    return (
        <div>
            <div className='comment-list-item'>
                <div className='comment-list-item-top'>
                    <div className='comment-list-item-profile-box'>
                        <div className='comment-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : defaultPofileImage })`}}></div>
                    </div>
                    <div className='comment-list-item-nickname'>{nickname}</div>
                    <div className='comment-list-item-divider'>{'|'}</div>
                    <div className='comment-list-item-time'>{writeDatetime}</div>
                </div>
                <div className='comment-list-item-main'>
                    <div className='comment-list-item-content'>{content}</div>
                </div>
            </div>
        </div>
    )
}
