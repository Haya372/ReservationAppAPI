import React, { useState } from 'react';
import ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

export default function DeleteButton(props){
  const [show, setShow] = useState(false);

  const onClickDelete = async () => {
    setShow(false);
    props.onClick();
  }

  return (
    <div>
      <div className="text-red-500 flex justify-end">
        <Button
          variant="outlined"
          onClick={() => setShow(true)}
          color='inherit'
        >
          Delete
        </Button>
      </div>
      { show ? 
        ReactDOM.createPortal((
          <div className="fixed z-10 inset-0 w-screen h-screen bg-gray-400 bg-opacity-60">
            <div className="fixed top-1/2 left-1/2 w-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
              <Card>
                <CardContent>
                  <div className="text-xl font-semibold my-3 mx-4">注意</div>
                  <div className="my-2 mx-4">
                    削除してしまうと元に戻すことはできません
                  </div>
                  <div className="mt-2 mx-4 mb-4">
                    本当によろしいですか？
                  </div>
                  <Divider />
                  <div className="flex my-4 justify-around text-red-500">
                    <Button
                      type="submit"
                      variant="outlined"
                      color="inherit"
                      onClick={onClickDelete}
                    >
                      削除
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setShow(false)}
                    >キャンセル
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ), document.getElementById('modal'))
      : null }
    </div>
  )
}