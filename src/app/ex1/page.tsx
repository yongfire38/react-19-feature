"use client";

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

export default function Example1() {
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleAddItem = () => {
    startTransition(() => {
      const newList: string[] = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
      setList(newList);
    });
  };

  const handleReset = () => {
    setList([]);
  };

  return (
    <div className={styles.container}>
      <h1>useTransition 사용</h1>
      <p>React 18.0.0 이상에서의 useTransition 사용</p>
      <p>startTransition()에 콜백 함수를 넘기면, state의 갱신에 의한 재 랜더링이 완료되기 전까지 isPending은 true를 반환한다</p>
      <p>무거운 작업을 진행하는 동안 UI의 반응성을 유지하기 위함</p>

      <br />

      <p>`동기 데이터 추가` 버튼을 누르면 isPending이 true인 동안에는 메시지 컴포넌트 표시 및 버튼 문구의 변경이 수행된다</p>

      <br />

      <div className={styles.buttonContainer}>
        <button 
          onClick={handleAddItem}
          disabled={isPending}
          className={styles.button}
        >
          {isPending ? "데이터 로딩 중..." : "동기 데이터 추가"}
        </button>
        <button onClick={handleReset} className={styles.button}>
          초기화
        </button>
        <Link href="/" className={styles.homeLink}>
          메인으로
        </Link>
      </div>

      <div className={styles.listContainer}>
        <h3>아이템 목록 ({list.length}개)</h3>
        {isPending && (
          <div className={styles.loadingMessage}>
            새로운 데이터를 불러오는 중...
          </div>
        )}
        <ul className={styles.list}>
          {list.map((item, index) => (
            <li key={index} className={styles.listItem}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
