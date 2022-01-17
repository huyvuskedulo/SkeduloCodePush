//
//  JSProcessManager.swift
//  SkeduloCodePush
//
//  Created by Huy Vu on 17/01/2022.
//

import Foundation

class JSProcessManager {
    typealias InvokeMethodContinuation = CheckedContinuation<ReactNativeCallbackData, Error>

    static var shared: JSProcessManager = JSProcessManager();
    var currentContinuation: InvokeMethodContinuation? = nil;
    
    func invokeMethod(methodName: String) async throws -> ReactNativeCallbackData {
            
        return try await withCheckedThrowingContinuation { (continuation:InvokeMethodContinuation) in
            currentContinuation = continuation;
            
            EventEmitter.sharedInstance.dispatch(name: methodName, body: nil)
        }
    }
    
    func callBackMethod(result: String) {
        if currentContinuation == nil {
            return;
        }
        
        currentContinuation?.resume(with: Result.success(result.parse(to: ReactNativeCallbackData.self) ?? ReactNativeCallbackData()))
    }
    
}

struct ReactNativeCallbackData : Codable {
    
    init (){
        message = ""
        redirectionUrl = ""
    }
    
    var message: String
    var redirectionUrl: String
}

extension String {

    func parse<D>(to type: D.Type) -> D? where D: Decodable {

        let data: Data = self.data(using: .utf8)!

        let decoder = JSONDecoder()

        do {
            let _object = try decoder.decode(type, from: data)
            return _object

        } catch {
            return nil
        }
    }
}
