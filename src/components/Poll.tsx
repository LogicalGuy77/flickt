"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PollOption {
  id: number;
  text: string;
  votes: number;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
  voted: boolean;
}

export default function Poll() {
  // Dummy poll
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 1,
      question:
        "How should Flickt approach content moderation to balance free speech with community safety?",
      options: [
        {
          id: 1,
          text: "Community-driven moderation: Users vote on reported content",
          votes: 10,
        },
        {
          id: 2,
          text: "AI-assisted moderation with human oversight",
          votes: 5,
        },
        {
          id: 3,
          text: "Minimal moderation: Remove only illegal content",
          votes: 3,
        },
      ],
      voted: false,
    },
  ]);

  const [newPollQuestion, setNewPollQuestion] = useState("");
  const [newPollOptions, setNewPollOptions] = useState<string[]>(["", ""]);
  const [showNewPollForm, setShowNewPollForm] = useState(false);

  const handleCreatePoll = () => {
    if (
      newPollQuestion &&
      newPollOptions.filter((option) => option.trim() !== "").length >= 2
    ) {
      const newPoll: Poll = {
        id: Date.now(),
        question: newPollQuestion,
        options: newPollOptions
          .filter((option) => option.trim() !== "")
          .map((option, index) => ({ id: index, text: option, votes: 0 })),
        voted: false,
      };
      setPolls([newPoll, ...polls]);
      setNewPollQuestion("");
      setNewPollOptions(["", ""]);
      setShowNewPollForm(false);
    }
  };

  const handleVote = (pollId: number, optionId: number) => {
    setPolls(
      polls.map((poll) =>
        poll.id === pollId
          ? {
              ...poll,
              voted: true,
              options: poll.options.map((option) =>
                option.id === optionId
                  ? { ...option, votes: option.votes + 1 }
                  : option
              ),
            }
          : poll
      )
    );
  };

  const handleAddOption = () => {
    setNewPollOptions([...newPollOptions, ""]);
  };

  const handleRemoveOption = (index: number) => {
    setNewPollOptions(newPollOptions.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button
          onClick={() => setShowNewPollForm(!showNewPollForm)}
          className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" />{" "}
          {showNewPollForm ? "Cancel" : "Create New Poll"}
        </Button>

        <AnimatePresence>
          {showNewPollForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="w-full bg-gray-900 text-white border-white border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Create a New Poll
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Enter your question"
                    value={newPollQuestion}
                    onChange={(e) => setNewPollQuestion(e.target.value)}
                    className="bg-black text-white border-gray-700 focus:border-white focus:ring-white"
                  />
                  {newPollOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newPollOptions];
                          newOptions[index] = e.target.value;
                          setNewPollOptions(newOptions);
                        }}
                        className="bg-black text-white border-gray-700 focus:border-white focus:ring-white"
                      />
                      {index > 1 && (
                        <Button
                          onClick={() => handleRemoveOption(index)}
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={handleAddOption}
                    variant="outline"
                    className="bg-black hover:bg-gray-900 text-white border-white"
                  >
                    Add Option
                  </Button>
                  <Button
                    onClick={handleCreatePoll}
                    className="w-full bg-white hover:bg-gray-200 text-black transition-all duration-300 ease-in-out transform hover:scale-105"
                    disabled={
                      !newPollQuestion ||
                      newPollOptions.filter((option) => option.trim() !== "")
                        .length < 2
                    }
                  >
                    Create Poll
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {polls.map((poll) => (
            <motion.div
              key={poll.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="w-full bg-gray-900 text-white border-white border shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {poll.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {poll.options.map((option) => {
                    const totalVotes = poll.options.reduce(
                      (sum, o) => sum + o.votes,
                      0
                    );
                    const percentage =
                      totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    return (
                      <Button
                        key={option.id}
                        className="w-full justify-between bg-black hover:bg-gray-900 text-white relative overflow-hidden transition-all duration-300 ease-in-out"
                        variant={poll.voted ? "outline" : "default"}
                        onClick={() => handleVote(poll.id, option.id)}
                        disabled={poll.voted}
                      >
                        <span className="z-10 relative">{option.text}</span>
                        {poll.voted && (
                          <>
                            <div
                              className="absolute left-0 top-0 bottom-0 bg-white opacity-20 transition-all duration-500 ease-out"
                              style={{ width: `${percentage}%` }}
                            />
                            <div className="flex items-center space-x-2 z-10 relative">
                              <span>{Math.round(percentage)}%</span>
                              {option.votes > 0 && (
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </>
                        )}
                      </Button>
                    );
                  })}
                  {poll.voted && (
                    <p className="text-sm text-gray-400 text-center">
                      {poll.options.reduce(
                        (sum, option) => sum + option.votes,
                        0
                      )}{" "}
                      vote
                      {poll.options.reduce(
                        (sum, option) => sum + option.votes,
                        0
                      ) !== 1
                        ? "s"
                        : ""}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
