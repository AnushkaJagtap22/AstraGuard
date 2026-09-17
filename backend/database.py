import sqlite3
import json
import os
from typing import Dict, Any, List, Optional
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "astraguard.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Investigations Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS investigations (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            input_type TEXT NOT NULL,
            input_content TEXT NOT NULL,
            status TEXT NOT NULL,
            assessment TEXT,
            confidence TEXT,
            evidence_strength TEXT,
            threats_detected JSON,
            claims JSON,
            sources JSON,
            evidence_nodes JSON,
            evidence_edges JSON,
            context_findings JSON,
            identity_findings JSON,
            timeline JSON,
            recommendations JSON,
            report TEXT,
            user_notes TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    ''')
    
    # Risk Radar Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS risk_radar (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            severity TEXT NOT NULL,
            source TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            summary TEXT NOT NULL,
            preloaded_input TEXT NOT NULL,
            investigation_id TEXT
        )
    ''')

    # Identity Audits Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS identity_audits (
            id TEXT PRIMARY KEY,
            handle TEXT NOT NULL,
            platform TEXT NOT NULL,
            risk_score TEXT NOT NULL,
            impersonation_risk TEXT NOT NULL,
            findings JSON NOT NULL,
            timeline JSON NOT NULL,
            created_at TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()

def save_investigation(data: Dict[str, Any]):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    now = datetime.now().isoformat()
    cursor.execute('''
        INSERT OR REPLACE INTO investigations (
            id, title, input_type, input_content, status, assessment, confidence,
            evidence_strength, threats_detected, claims, sources, evidence_nodes,
            evidence_edges, context_findings, identity_findings, timeline, recommendations,
            report, user_notes, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data["id"],
        data.get("title", "Untitled Investigation"),
        data.get("input_type", "text"),
        data.get("input_content", ""),
        data.get("status", "COMPLETED"),
        data.get("assessment", "MISLEADING"),
        data.get("confidence", "HIGH"),
        data.get("evidence_strength", "STRONG"),
        json.dumps(data.get("threats_detected", [])),
        json.dumps(data.get("claims", [])),
        json.dumps(data.get("sources", [])),
        json.dumps(data.get("evidence_nodes", [])),
        json.dumps(data.get("evidence_edges", [])),
        json.dumps(data.get("context_findings", {})),
        json.dumps(data.get("identity_findings", {})),
        json.dumps(data.get("timeline", [])),
        json.dumps(data.get("recommendations", [])),
        data.get("report", ""),
        data.get("user_notes", ""),
        data.get("created_at", now),
        now
    ))
    conn.commit()
    conn.close()

def get_investigation(inv_id: str) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM investigations WHERE id = ?', (inv_id,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        return None
    
    item = dict(row)
    return {
        "id": item["id"],
        "title": item["title"],
        "input_type": item["input_type"],
        "input_content": item["input_content"],
        "status": item["status"],
        "assessment": item["assessment"],
        "confidence": item["confidence"],
        "evidence_strength": item["evidence_strength"],
        "threats_detected": json.loads(item["threats_detected"] or "[]"),
        "claims": json.loads(item["claims"] or "[]"),
        "sources": json.loads(item["sources"] or "[]"),
        "evidence_nodes": json.loads(item["evidence_nodes"] or "[]"),
        "evidence_edges": json.loads(item["evidence_edges"] or "[]"),
        "context_findings": json.loads(item["context_findings"] or "{}"),
        "identity_findings": json.loads(item["identity_findings"] or "{}"),
        "timeline": json.loads(item["timeline"] or "[]"),
        "recommendations": json.loads(item["recommendations"] or "[]"),
        "report": item["report"],
        "user_notes": item["user_notes"],
        "created_at": item["created_at"],
        "updated_at": item["updated_at"]
    }

def get_all_investigations() -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM investigations ORDER BY created_at DESC')
    rows = cursor.fetchall()
    conn.close()
    
    results = []
    for row in rows:
        item = dict(row)
        results.append({
            "id": item["id"],
            "title": item["title"],
            "input_type": item["input_type"],
            "input_content": item["input_content"],
            "status": item["status"],
            "assessment": item["assessment"],
            "confidence": item["confidence"],
            "evidence_strength": item["evidence_strength"],
            "threats_detected": json.loads(item["threats_detected"] or "[]"),
            "claims_count": len(json.loads(item["claims"] or "[]")),
            "sources_count": len(json.loads(item["sources"] or "[]")),
            "created_at": item["created_at"]
        })
    return results

def save_radar_item(item: Dict[str, Any]):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR REPLACE INTO risk_radar (id, title, category, severity, source, timestamp, summary, preloaded_input, investigation_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        item["id"], item["title"], item["category"], item["severity"],
        item["source"], item["timestamp"], item["summary"], item["preloaded_input"], item.get("investigation_id")
    ))
    conn.commit()
    conn.close()

def get_radar_items() -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM risk_radar ORDER BY timestamp DESC')
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]
