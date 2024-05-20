import { useEffect } from "react";
import { getAllTopics } from "../services/topic.service";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchTopicSuccess, setCurrentTopic } from "store/slices/topic.slice";
import { Button } from "flowbite-react";
import { Topic } from "src/models/topic";
import CardTopic from "./card-topic";

const TopicContainer = () => {
  const dispatch = useAppDispatch();
  const { topics, currentTopic } = useAppSelector((state) => state.topic);
  useEffect(() => {
    getAllTopics().then((data) => {
      dispatch(fetchTopicSuccess(data));
      if (data.length > 0) {
        handleCurrentTopic(data[0]);
      }
    });
  }, []);

  const handleCurrentTopic = (topic: Topic) => {
    dispatch(setCurrentTopic(topic));
  };

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 xl:text-3xl dark:text-white">
        Contenidos por Temáticas
      </h2>
      <div className="grid gap-4 items-start mt-10">
        <Button.Group>
          {topics.map((topic) => (
            <Button
              key={topic._id}
              color={currentTopic?._id === topic._id ? "cyan" : "gray"}
              className="min-w-32"
              onClick={() => handleCurrentTopic(topic)}
            >
              {topic.name}
            </Button>
          ))}
        </Button.Group>
      </div>
      {currentTopic ? (
        <div className="grid gap-4 items-start mt-10">
          <CardTopic />
        </div>
      ) : null}
    </section>
  );
};

export default TopicContainer;
