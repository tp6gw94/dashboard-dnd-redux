import React, { useState } from 'react';
import classnames from 'classnames';
import { CardTypes } from '../consts/cardTypes';
import EmptyCard from '../components/EmptyCard';
import Draggable from '../components/Draggable';
import BaseButton from '../components/BaseButton';
import { useAppDispatch } from '../app/hooks';
import { saveDashboard } from '../features/card/cardSlice';

type Props = {};

const Sidebar: React.FC<Props> = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const onSave = () => {
    dispatch(saveDashboard());
    window.alert('儲存成功');
  };

  return (
    <aside className={classnames(isShow ? 'w-1/2' : 'w-0')}>
      <div className={'h-full bg-blue-600 sticky top-0 min-h-screen'}>
        <div className="flex w-full h-full relative">
          {isShow && (
            <div
              className={classnames(
                'flex flex-col h-full justify-between text-gray-200 p-4 w-full'
              )}
            >
              <div className="w-full h-full">
                <div className="flex items-center">
                  <h3 className="text-2xl">Dashboard</h3>
                </div>
                <div className="space-y-2 mt-2.5 flex flex-col p-2">
                  <Draggable
                    name="預測天氣"
                    id={'predict'}
                    close={false}
                    data={{ type: CardTypes.PREDICT }}
                  >
                    <EmptyCard title="預測天氣" variant="green" />
                  </Draggable>
                  <Draggable
                    name="每日雨量記錄"
                    id={'rainfall'}
                    close={false}
                    data={{ type: CardTypes.RAINFALL }}
                  >
                    <EmptyCard title="每日雨量記錄" variant="yellow" />
                  </Draggable>
                </div>
                <div className="flex justify-end mt-2.5">
                  <BaseButton onClick={() => onSave()} variant="secondary">
                    儲存
                  </BaseButton>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsShow(!isShow)}
            className="w-6 h-6 right-3.5 top-1/2 -mr-7 bg-indigo-400 absolute shadow rounded-full flex items-center justify-center cursor-pointer"
          >
            <i
              className={classnames(
                isShow ? 'gg-chevron-left' : 'gg-chevron-right'
              )}
            />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
