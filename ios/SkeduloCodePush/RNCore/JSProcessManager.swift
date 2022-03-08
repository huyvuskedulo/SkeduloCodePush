//
//  JSProcessManager.swift
//  SkeduloCodePush
//
//  Created by Huy Vu on 17/01/2022.
//

import Foundation

class JSProcessManager {

    static var shared: JSProcessManager = JSProcessManager();
    var currentCallback: ((ReactNativeCallbackData) -> ())? = nil
    

    
    func invokeMethod(methodName: String, callBack: @escaping (ReactNativeCallbackData) -> ()) {
            
        currentCallback = callBack;
        
        EventEmitter.sharedInstance.dispatch(name: methodName, body: nil)
    }
    
    func callBackMethod(result: String) {
        if currentCallback == nil {
            return;
        }
        
        currentCallback!(result.parse(to: ReactNativeCallbackData.self) ?? ReactNativeCallbackData())
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
