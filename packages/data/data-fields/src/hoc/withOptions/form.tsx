import { faGripVertical, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@uidu/button';
import FieldColorPicker from '@uidu/field-color-picker';
import FieldText from '@uidu/field-text';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useIntl } from 'react-intl';

const Trigger = ({ triggerProps, toggleDialog, value }) => (
  <div
    {...triggerProps}
    style={{ backgroundColor: value, width: 30, height: 20 }}
    onClick={toggleDialog}
    tw="border rounded"
    className="ignore-onclickoutside"
  />
);

const reorder = (
  list: Option[],
  startIndex: number,
  endIndex: number,
): Option[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

type Option = {
  id: number;
  name?: string;
  color: string;
  isNewOption: boolean;
};

export default function WithOptionsForm({
  prefix = 'attributes',
  options = [
    {
      id: 1,
      color: 'red',
      isNewOption: true,
    },
  ],
}: {
  prefix?: string;
  options: Option[];
}) {
  const intl = useIntl();

  const [currentOptions, setCurrentOptions] = useState<Option[]>(options);
  const sortAlphabetically = () => console.log('sort');

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setCurrentOptions((prevCurrentOptions) =>
      reorder(
        prevCurrentOptions,
        result.source.index,
        result.destination.index,
      ),
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {currentOptions.map((option, index) => (
              <Draggable
                key={option.id}
                draggableId={`draggable-${option.id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    tw="border rounded flex items-center flex-row mb-3"
                    ref={provided.innerRef}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...provided.draggableProps}
                  >
                    <div
                      tw="mx-2 p-3 flex"
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...provided.dragHandleProps}
                    >
                      <FontAwesomeIcon icon={faGripVertical} />
                    </div>
                    <div tw="flex-grow flex items-center">
                      {!option.isNewOption && (
                        <FieldText
                          type="hidden"
                          name={`${prefix}[options][${index}][id]`}
                          value={option.id}
                        />
                      )}
                      <FieldText
                        type="hidden"
                        name={`${prefix}[options][${index}][position]`}
                        value={index}
                      />
                      <FieldText
                        name={`${prefix}[options][${index}][name]`}
                        layout="elementOnly"
                        placeholder={intl.formatMessage({
                          defaultMessage: 'Insert option name',
                        })}
                        required
                        value={option.name}
                        tw="border-0"
                      />
                      <div tw="ml-3">
                        <FieldColorPicker
                          name={`${prefix}[options][${index}][color]`}
                          trigger={Trigger}
                          layout="elementOnly"
                          value={option.color}
                        />
                      </div>
                    </div>
                    <Button
                      tabIndex={-1}
                      type="button"
                      onClick={() => {
                        setCurrentOptions((prevCurrentOptions) => [
                          ...prevCurrentOptions.slice(0, index),
                          ...prevCurrentOptions.slice(index + 1),
                        ]);
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div tw="my-3">
        <Button
          type="button"
          onClick={() => {
            setCurrentOptions((prevCurrentOptions) => [
              ...prevCurrentOptions,
              {
                id: prevCurrentOptions.length + 1,
                isNewOption: true,
                color: getRandomColor(),
              },
            ]);
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Add option' })}
        </Button>
      </div>
    </DragDropContext>
  );
}
