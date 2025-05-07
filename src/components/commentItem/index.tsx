import React from 'react'
import { CommentListItem } from 'types/interface'
import './style.css';
import defaultPofileImage from 'assets/image/default-profile-image.png'
import choiceMenuImage from 'assets/image/choice-menu.png'

interface Props {
    commentListItem: CommentListItem;
}

//          component: Comment List Item            //
export default function CommentItem({ commentListItem }: Props) {
    //            state: properties          //
    const { nickname, profileImage, writeDatetime, menu, content } = commentListItem     

    //            render: Commnet List Item 컴포넌트 랜더링           //
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
                    <div className='comment-list-item-choice-menu-box'>
                        <div className='comment-list-item-choice-menu-image' style={{ backgroundImage: `url(${choiceMenuImage})` }}></div>
                        <div className='comment-list-item-menu'>{menu}</div>
                    </div>
                </div>
                
                <div className='comment-list-item-content'>{content}</div>
            </div>
        </div>
    )
}
