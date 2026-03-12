"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "@/src/i18n/routing";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";

interface HistoryItem {
  id: string;
  type: "input" | "output" | "error";
  content: React.ReactNode;
}

const ASCII_LOGO = `
        _ _       _ _       
       | (_)_ __ | (_)_ __  
       | | | '_  | | | '_ |
       | | | | | | | | | | |
       |_|_|_| |_|_|_|_| |_|
`;

export default function TerminalPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/");
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [router]);

  const handleWrapperClick = () => {
    inputRef.current?.focus();
  };

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    // Initial welcome text
    setHistory([
      {
        id: "logo",
        type: "output",
        content: (
          <pre className="text-[#cccccc] leading-tight mb-4 text-xs sm:text-sm md:text-base hidden sm:block">
            {ASCII_LOGO}
          </pre>
        ),
      },
      {
        id: "welcome1",
        type: "output",
        content: (
          <div className="text-[#333333] font-bold mb-1">👋 Welcome to linlin's Terminal!</div>
        ),
      },
      {
        id: "welcome2",
        type: "output",
        content: (
          <div className="mb-1 text-[#666666]">
            Type <span className="text-[#0066cc] font-bold">'help'</span> to see what you can do, or
            start exploring!
          </div>
        ),
      },
      {
        id: "welcome3",
        type: "output",
        content: (
          <div className="mb-4 text-[#666666]">
            Type <span className="text-[#0066cc] font-bold">'clear'</span> to clear the terminal.
          </div>
        ),
      },
    ]);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-input",
          type: "input",
          content: cmd,
        },
      ]);
      return;
    }

    const newHistoryItem: HistoryItem = {
      id: Date.now().toString() + "-input",
      type: "input",
      content: cmd,
    };

    setHistory((prev) => [...prev, newHistoryItem]);
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ").filter(Boolean);
    const baseCmd = parts[0].toLowerCase();

    let outputContent: React.ReactNode = null;

    switch (baseCmd) {
      case "help":
        outputContent = (
          <div className="flex flex-col gap-6 mb-4 mt-2">
            <div>
              <div className="font-bold mb-2 text-[#333333]">🚀 Core Commands:</div>
              <div className="grid grid-cols-[150px_1fr] sm:grid-cols-[200px_1fr] gap-x-2 gap-y-1">
                <div className="text-[#0066cc] font-medium">help</div>
                <div className="text-[#666666]"># Discover everything you can do here.</div>
                <div className="text-[#0066cc] font-medium">clear</div>
                <div className="text-[#666666]"># Clear the terminal.</div>
                <div className="text-[#0066cc] font-medium">version</div>
                <div className="text-[#666666]"># See the latest updates on my site.</div>
                <div className="text-[#0066cc] font-medium">echo $MISSION</div>
                <div className="text-[#666666]"># explore about my mission</div>
                <div className="text-[#0066cc] font-medium">ls</div>
                <div className="text-[#666666]"># Explore this site.</div>
                <div className="text-[#0066cc] font-medium">ls projects</div>
                <div className="text-[#666666]"># Explore ongoing projects.</div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-2 text-[#333333]">📝 Blog Commands:</div>
              <div className="grid grid-cols-[150px_1fr] sm:grid-cols-[200px_1fr] gap-x-2 gap-y-1">
                <div className="text-[#0066cc] font-medium">blog status</div>
                <div className="text-[#666666]"># check this site still alive</div>
                <div className="text-[#0066cc] font-medium">blog owner latest</div>
                <div className="text-[#666666]"># get to know my recent situation</div>
                <div className="text-[#0066cc] font-medium">blog comments</div>
                <div className="text-[#666666]"># Let's see who's talking bad about me</div>
                <div className="text-[#0066cc] font-medium">blog devlog</div>
                <div className="text-[#666666]"># dev logs</div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-2 text-[#333333]">🎁 Easter Egg Hunt:</div>
              <div className="grid grid-cols-[150px_1fr] sm:grid-cols-[200px_1fr] gap-x-2 gap-y-1">
                <div className="text-[#e3554e] font-medium">show_story</div>
                <div className="text-[#666666]"># Laugh,my friend.</div>
                <div className="text-[#e3554e] font-medium">whoami</div>
                <div className="text-[#666666]"># Soul torture</div>
                <div className="text-[#e3554e] font-medium">sudo useradd {"{name}"}</div>
                <div className="text-[#666666]">
                  # Want special privileges? Try announcing your name
                </div>
                <div className="text-[#e3554e] font-medium">rustup challenge</div>
                <div className="text-[#666666]"># Test your rusty level</div>
                <div className="text-[#e3554e] font-medium">ls -a</div>
                <div className="text-[#666666]">
                  # Shh, don't let anyone know you secretly read the hidden file.
                </div>
                <div className="text-[#e3554e] font-medium">pwd</div>
                <div className="text-[#666666]"># find the backend admin username and password</div>
                <div className="text-[#e3554e] font-medium">rm</div>
                <div className="text-[#666666]"># HeiHei</div>
                <div className="text-[#e3554e] font-medium">rm -rf</div>
                <div className="text-[#666666]"># You dare?</div>
              </div>
            </div>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        return;
      case "version":
        outputContent = (
          <div className="mb-4 text-[#333333]">v1.500 (最新的，也许比昨天少了一些bug吧...)</div>
        );
        break;
      case "whoami":
        outputContent = <div className="mb-4 text-[#333333]">一个帅哥</div>;
        break;
      case "echo":
        if (parts[1] === "$MISSION") {
          outputContent = <div className="mb-4 text-[#333333]">GET A JOB.RIGHT! N!O!W!.</div>;
        } else {
          outputContent = (
            <div className="mb-4 text-[#333333]">
              你让我说我就说? 好吧:“{parts.slice(1).join(" ")}” 🙄
            </div>
          );
        }
        break;
      case "ls":
        if (parts[1] === "projects") {
          outputContent = (
            <div className="flex gap-4 mb-4 flex-wrap">
              <span className="text-[#0066cc] font-bold"> blog </span>
              <span className="text-[#0066cc] font-bold">一个3D web组件库(进行中)</span>
              <span className="text-[#0066cc] font-bold">一个可拖拽画布、低代码平台(进行中)</span>
              <span className="text-[#0066cc] font-bold">React Markdowwn流式渲染处理器(未来)</span>
            </div>
          );
        } else if (parts[1] === "-a") {
          outputContent = (
            <div className="flex gap-4 mb-4 flex-wrap">
              <span className="text-[#0066cc]">.</span>
              <span className="text-[#0066cc]">..</span>
              <span className="text-[#e3554e] font-bold animate-pulse">
                .A mysterious diary (It can't be opened, don't try).
              </span>
              <span>readme.md</span>
            </div>
          );
        } else {
          outputContent = (
            <div className="flex gap-4 mb-4 flex-wrap">
              <span className="text-[#0066cc] font-medium">projects/</span>
              <span className="text-[#0066cc] font-medium">about/</span>
              <span className="text-[#0066cc] font-medium">novel/</span>
              <span className="text-[#0066cc] font-medium">blog/</span>
              <span className="text-[#0066cc] font-medium">Mrs Zhao/</span>
              <span className="text-[#0066cc] font-medium">photo/</span>
              <span className="text-[#0066cc] font-medium">admin/</span>
              <span className="text-[#0066cc] font-medium">terminal/</span>
              <span>readme.md</span>
            </div>
          );
        }
        break;
      case "blog":
        if (parts[1] === "status") {
          outputContent = (
            <div className="mb-4 text-[#333333]">博客状态：勉强活着，站长就不好说了</div>
          );
        } else if (parts[1] === "owner") {
          outputContent = (
            <div className="mb-4 text-[#333333]">站长最近：忙着毕业就业 筹划旅行</div>
          );
        } else if (parts[1] === "comments") {
          outputContent = (
            <div className="mb-4 text-[#333333]">"我和我朋友都觉得你挺招笑的。" --站长的来时路</div>
          );
        } else if (parts[1] === "devlog") {
          outputContent = <div className="mb-4 text-[#333333]">站长的秘密 不给你看</div>;
        } else {
          outputContent = (
            <div className="mb-4 text-[#333333]">
              你想查啥？输入 <span className="text-[#0066cc]">blog status</span> 或{" "}
              <span className="text-[#0066cc]">blog owner latest</span> 试试？别乱敲啦！
            </div>
          );
        }
        break;
      case "show_story":
        outputContent = <div className="mb-4 text-[#333333]">想要唐氏留得住，那就重走来时路。</div>;
        break;
      case "rustup":
        if (parts[1] === "challenge") {
          outputContent = (
            <div className="mb-4 text-green-600 font-bold">
              fn main() {"{"} println!("Rust 真是太简单了！(站长第7次入门rust了)"); {"}"}
            </div>
          );
        } else {
          outputContent = (
            <div className="mb-4 text-[#333333]">
              你要干嘛？输入 <span className="text-[#e3554e]">rustup challenge</span> 试试你的水平。
            </div>
          );
        }
        break;
      case "cd":
      case "pwd":
      case "cat":
        outputContent = (
          <div className="mb-4 text-green-600 font-bold">admin的密码是7355608. 爆能器已经部署</div>
        );
        break;
      case "sudo":
        if (parts[1] === "useradd") {
          const name = parts.slice(2).join(" ");
          outputContent = (
            <div className="mb-4 text-[#050404]">
              哇哦，尊贵的 <span className="font-bold text-[#e3554e]">{name || "神秘人"}</span>{" "}
              降临了！(给你磕个头)
            </div>
          );
        } else {
          outputContent = (
            <div className="text-red-500 mb-4 font-bold">
              警告 ⚠️：你不是 sudoer！此事将被报告给季老师
            </div>
          );
        }
        break;
      case "rm":
        if (trimmed.includes("-rf")) {
          outputContent = (
            <div className="text-red-500 mb-4 animate-bounce font-bold">
              💥 BOOM! 系统已销毁... <br />
              <span className="text-[#333333] font-normal">删库跑路 已报警</span>
            </div>
          );
        } else {
          outputContent = (
            <div className="mb-4 text-[#333333]">
              想删东西？先带上 <span className="text-[#e3554e]">-rf</span> 试试
            </div>
          );
        }
        break;
      default:
        outputContent = (
          <div className="text-red-500 mb-4">
            “{baseCmd}” 是什么鬼指令？我不认识它！输入{" "}
            <span className="text-[#0066cc]">'help'</span> 找点乐子吧
          </div>
        );
    }

    if (outputContent) {
      setHistory((prev) => [
        ...prev,
        { id: Date.now().toString() + "-output", type: "output", content: outputContent },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex =
          historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#fafafa] text-soot font-mono text-xs sm:text-sm md:text-base flex flex-col selection:bg-[#0066cc] selection:text-white">
      {/* Top Bar */}
      <div className="h-10 sm:h-12 bg-[#e8e8e8] flex flex-none items-center justify-between px-3 sm:px-4 border-b border-[#d0d0d0] shadow-sm">
        <div className="flex items-center gap-2 w-1/3">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-[#888888]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center w-1/3">
          <span className="text-soot font-bold text-center truncate">guest@linlin</span>
        </div>
        <div className="flex items-center justify-end gap-2 sm:gap-3 w-1/3">
          {/* Windows-style window controls */}
          <div
            className="cursor-pointer text-smoke hover:bg-[#d0d0d0] hover:text-[#333] transition-colors flex items-center justify-center w-8 h-8 rounded-sm"
            onClick={handleClose}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="5" width="10" height="1.5" fill="currentColor" />
            </svg>
          </div>
          <div
            className="cursor-pointer text-[#666666] hover:bg-[#d0d0d0] hover:text-[#333] transition-colors flex items-center justify-center w-8 h-8 rounded-sm"
            onClick={handleClose}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1.5" y="1.5" width="9" height="9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>
          <div
            className="cursor-pointer text-[#666666] hover:text-white hover:bg-[#e81123] transition-colors w-8 h-8 flex items-center justify-center rounded-sm"
            onClick={handleClose}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 11M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 pb-20" onClick={handleWrapperClick}>
        {history.map((item) => (
          <div key={item.id}>
            {item.type === "input" && (
              <div className="flex gap-2 items-start sm:items-center mb-1 flex-col sm:flex-row">
                <span className="text-[#0066cc] whitespace-nowrap font-bold">guest@linlin:~$</span>
                <span className="break-all text-[#333333] font-medium">{item.content}</span>
              </div>
            )}
            {item.type !== "input" && <div>{item.content}</div>}
          </div>
        ))}

        {/* Current Input */}
        <div className="flex gap-2 items-start sm:items-center flex-col sm:flex-row mt-1">
          <span className="text-[#0066cc] whitespace-nowrap font-bold">guest@linlin:~$</span>
          <div className="relative flex-1 flex items-center w-full">
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent outline-none border-none text-transparent caret-transparent font-inherit absolute inset-0 z-10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            {/* Custom Caret Rendering */}
            <div className="pointer-events-none flex font-inherit whitespace-pre-wrap break-all items-center text-[#333333] font-medium">
              <span>{input}</span>
              <span className="w-2 sm:w-2.5 bg-[#0066cc] animate-pulse h-4 sm:h-5 md:h-6 ml-0.5 inline-block" />
            </div>
          </div>
        </div>

        <div ref={endRef} className="h-4" />
      </div>

      {/* Footer bar for bottom instructions */}
      <div className="h-6 sm:h-8 bg-[#e8e8e8] border-t border-[#d0d0d0] text-[#888888] flex flex-none items-center justify-between px-3 sm:px-4 text-[10px] sm:text-xs font-medium">
        <div>Press 'ESC' to Quit</div>
        <div>Powered by linlin ✨</div>
      </div>
    </div>
  );
}
